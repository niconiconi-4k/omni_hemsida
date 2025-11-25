/**
 * ----------------------------------------------------------------
 * OBS: Google表格端
 * ----------------------------------------------------------------
 * 接收 POST，保存到 sheet，并发邮件给你
 * 支持传统 form-urlencoded 或 JSON body
 * 返回简单 JSON，包含 CORS header 以支持浏览器 fetch
 */

// ---------- 配置区 ----------
const SHEET_NAME = 'Sheet1'; // 改成你的工作表页签名（默认 Sheet1）
const TO_EMAIL = 'eventually999@gmail.com'; // 改成你的收件邮箱
const EMAIL_SUBJECT = 'Webbsidan Meddelande';
const HONEYPOT_FIELD = 'website'; // 前端隐藏字段名（honeypot）
// ----------------------------

function doPost(e) {
  try {
    // 解析输入（支持 form-urlencoded 和 JSON）
    let data = {};
    if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents || '{}');
    } else {
      // e.parameter 对应 form data / x-www-form-urlencoded
      data = Object.assign({}, e.parameter);
    }

    // 简单防垃圾：honeypot 字段有值则拒绝
    if (data[HONEYPOT_FIELD]) {
      return jsonResponse({ status: 'spam', message: 'detected' }, 200);
    }

    // 基本字段
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const message = (data.message || '').trim();

    if (!name || !email || !message) {
      return jsonResponse({ status: 'error', message: 'missing_fields' }, 400);
    }

    // Get spreadsheet and append row
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Sheet not found: ' + SHEET_NAME);

    const timestamp = new Date();
    const ip = e && e.headers && (e.headers['X-Forwarded-For'] || e.headers['x-forwarded-for']) || '';
    const ua = e && e.headers && (e.headers['User-Agent'] || e.headers['user-agent']) || '';

    sheet.appendRow([timestamp, name, email, phone, message, ip, ua]);

    // 发邮件通知（可改为 HTML 内容）
    const body = [
      '您有一条新的站点留言：',
      '',
      '姓名: ' + name,
      '邮箱: ' + email,
      '电话: ' + phone,
      '',
      '留言:',
      message,
      '',
      '时间: ' + timestamp.toString(),
      '来源 IP: ' + ip,
    ].join('\n');

    MailApp.sendEmail({
      to: TO_EMAIL,
      subject: EMAIL_SUBJECT + ' — ' + name,
      body: body,
      replyTo: email
    });

    return jsonResponse({ status: 'ok', message: 'sent' }, 200);

  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message }, 500);
  }
}

// 辅助：返回带 CORS 的 JSON
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// 支持预检请求（CORS）
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: "ok"}))
    .setMimeType(ContentService.MimeType.JSON);
}
