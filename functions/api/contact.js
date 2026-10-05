/**
 * PaiFlow苹果派 留言后端（Cloudflare Pages Function，路由 /api/contact）
 *
 * 与 openstock 的 functions/api/contact.js 完全同一套：
 *   - 同源部署（随站点走），无独立 Worker、无跨域
 *   - 共用同一个 D1 数据库（绑定变量名 DB）
 *   - 共用同一个 Resend Key（RESEND_TOKEN）与收件邮箱（NOTIFY_EMAIL）
 *
 * 与 openstock 的唯一区别：写入时带 source = 'paiflow'，用于区分留言来自哪个站。
 * （openstock 写入的行 source 为 NULL，不影响它；两站读写同一张 messages 表。）
 *
 * 绑定（Cloudflare Pages 项目 → 设置 → 函数/变量，全部 GUI）：
 *   D1 数据库绑定   变量名 DB
 *   RESEND_TOKEN    Resend API Key（Secret）
 *   NOTIFY_EMAIL    接收通知的邮箱
 */

const SOURCE = 'paiflow';

const json = (obj, status) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: 'bad json' }, 400); }

  const name = String(body.name || '').trim().slice(0, 40);
  const contact = String(body.contact || '').trim().slice(0, 80);
  const message = String(body.message || '').trim().slice(0, 2000);
  const hp = String(body.hp || '');

  if (hp) return json({ ok: true }, 200);   // 蜜罐字段：机器人静默丢弃
  if (!message) return json({ ok: false, error: '留言不能为空' }, 400);
  if (!name && !contact) {
    return json({ ok: false, error: '请至少留一个称呼或联系方式' }, 400);
  }
  if (!env.DB) return json({ ok: false, error: '后端未配置数据库(D1)' }, 500);

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // 简单限流：同 IP 每小时最多 5 条
  try {
    const r = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM messages WHERE ip = ? AND created_at > datetime('now','-1 hour')"
    ).bind(ip).first();
    if (r && r.n >= 5) {
      return json({ ok: false, error: '发送太频繁，请稍后再试' }, 429);
    }
  } catch (e) { /* 表不存在等 → 放行，交给下面的 INSERT 暴露问题 */ }

  // 优先带 source 写入；若数据库尚未加该列（旧库），回退到不带 source 的写入，保证可用
  let ins;
  try {
    ins = await env.DB.prepare(
      'INSERT INTO messages (name, contact, message, ip, source) VALUES (?, ?, ?, ?, ?)'
    ).bind(name, contact, message, ip, SOURCE).run();
  } catch (e) {
    ins = await env.DB.prepare(
      'INSERT INTO messages (name, contact, message, ip) VALUES (?, ?, ?, ?)'
    ).bind(name, contact, message, ip).run();
  }
  if (!ins.success) return json({ ok: false, error: '写入失败' }, 500);

  // 通知失败不影响留言已入库
  try { await notify(env, name, contact, message); } catch (e) { /* 忽略 */ }
  return json({ ok: true }, 200);
}

async function notify(env, name, contact, message) {
  if (!(env.RESEND_TOKEN && env.NOTIFY_EMAIL)) return;
  const title = 'PaiFlow苹果派 新留言：' + (name || contact || '访客');
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + env.RESEND_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'PaiFlow苹果派 <onboarding@resend.dev>',
      to: [env.NOTIFY_EMAIL],
      subject: title,
      text: '来源：PaiFlow苹果派\n称呼：' + (name || '—') + '\n联系：' + (contact || '—') + '\n\n' + message,
    }),
  });
}
