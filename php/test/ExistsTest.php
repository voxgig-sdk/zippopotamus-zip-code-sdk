<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK exists test

require_once __DIR__ . '/../zippopotamuszipcode_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ZippopotamusZipCodeSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
