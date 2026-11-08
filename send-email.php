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
$safeName = preg_replace('/[\r\n]+/', ' ', $name);
$safeEmail = preg_replace('/[\r\n]+/', '', $email);
$subject = 'Project inquiry from ' . $safeName;
$body = ($service !== '' ? "Service: {$service}\n\n" : '') . $message . "\n\nName: {$safeName}\nEmail: {$safeEmail}" . ($phone !== '' ? "\nPhone: {$phone}" : '');
$headers = "From: Havtek website <info@havtek.co.ke>\r\nReply-To: {$safeEmail}\r\nContent-Type: text/plain; charset=UTF-8";
if (!mail('info@havtek.co.ke', $subject, $body, $headers)) {
  http_response_code(502);
  echo json_encode(['ok' => false, 'message' => 'The server could not send the message.']);
  exit;
}
echo json_encode(['ok' => true]);
