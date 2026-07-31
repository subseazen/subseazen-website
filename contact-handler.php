<?php
/**
 * Subseazen — Quote request handler (Hostinger-compatible, uses PHP mail()).
 * Point the form's action to this file and set data-live="true" on <form id="quote-form">
 * to POST here instead of using the email fallback.
 *
 * 1) Set $TO to the inbox that should receive enquiries.
 * 2) On Hostinger, PHP mail() works on most shared plans. For best deliverability,
 *    create an email account in hPanel (e.g. sales@subseazen.com) and use it below,
 *    or switch to SMTP / a form service (Formspree, Web3Forms).
 */

$TO      = 'Ravikumar@subseazen.com';                 // <-- where enquiries land
$SUBJECT = 'New quote request — subseazen.com';
$FROMDOMAIN = 'subseazen.com';                         // used for the From header

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot: bots fill this hidden field
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]); // pretend success
    exit;
}

function clean($v) { return trim(str_replace(["\r", "\n"], ' ', (string)($v ?? ''))); }

$name     = clean($_POST['name'] ?? '');
$company  = clean($_POST['company'] ?? '');
$email    = clean($_POST['email'] ?? '');
$phone    = clean($_POST['phone'] ?? '');
$interest = clean($_POST['interest'] ?? '');
$location = clean($_POST['location'] ?? '');
$message  = trim($_POST['message'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please provide a name, a valid email and a message.']);
    exit;
}

$body  = "New quote request from subseazen.com\n";
$body .= "--------------------------------------\n";
$body .= "Name:     $name\n";
$body .= "Company:  $company\n";
$body .= "Email:    $email\n";
$body .= "Phone:    $phone\n";
$body .= "Interest: $interest\n";
$body .= "Location: $location\n\n";
$body .= "Message:\n$message\n";

$headers  = "From: Subseazen Website <no-reply@$FROMDOMAIN>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($TO, $SUBJECT, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true, 'message' => 'Thanks — your request has been sent. We\'ll be in touch within one business day.']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Message could not be sent. Please email Ravikumar@subseazen.com directly.']);
}
