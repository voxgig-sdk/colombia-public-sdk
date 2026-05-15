<?php
declare(strict_types=1);

// ColombiaPublic SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ColombiaPublicFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ColombiaPublicBaseFeature();
            case "test":
                return new ColombiaPublicTestFeature();
            default:
                return new ColombiaPublicBaseFeature();
        }
    }
}
