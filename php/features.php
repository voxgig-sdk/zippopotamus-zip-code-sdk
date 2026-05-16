<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ZippopotamusZipCodeFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ZippopotamusZipCodeBaseFeature();
            case "test":
                return new ZippopotamusZipCodeTestFeature();
            default:
                return new ZippopotamusZipCodeBaseFeature();
        }
    }
}
