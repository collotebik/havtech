<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
  exit;
}
$payload = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$clean = static fn($value): string => trim((string)($value ?? ''));
if ($clean($payload['website'] ?? '') !== '') { echo json_encode(['ok' => true]); exit; }
$name = $clean($payload['name'] ?? '');
$email = $clean($payload['email'] ?? '');
$phone = $clean($payload['phone'] ?? '');
$service = $clean($payload['service'] ?? '');
$message = $clean($payload['message'] ?? '');
if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'message' => 'Please provide your name, email and message.']);
  exit;
}
$safeName = preg_replace('/[\r\n]+/', ' ', $name) ?? '';
$safeEmail = preg_replace('/[\r\n]+/', '', $email) ?? '';
$subject = 'Project inquiry from ' . $safeName;
$body = ($service !== '' ? "Service: {$service}\n\n" : '') . $message . "\n\nName: {$safeName}\nEmail: {$safeEmail}" . ($phone !== '' ? "\nPhone: {$phone}" : '');
$headers = "From: Havtek website <info@havtek.co.ke>\r\n" .
  "Reply-To: {$safeEmail}\r\n" .
  "MIME-Version: 1.0\r\n" .
  "Content-Type: text/plain; charset=UTF-8\r\n" .
  "X-Mailer: Havtek website";
$sent = @mail('info@havtek.co.ke', $subject, $body, $headers, '-finfo@havtek.co.ke');
/* Some shared hosts reject the optional envelope-sender argument. Retry with
   the standard signature before reporting a failure to the visitor. */
if (!$sent) {
  $sent = @mail('info@havtek.co.ke', $subject, $body, $headers);
}
if (!$sent) {
  error_log('Havtek contact form: PHP mail() returned false.');
  http_response_code(502);
  echo json_encode(['ok' => false, 'message' => 'The server could not send the message.']);
  exit;
}
echo json_encode(['ok' => true]);
