<?php
declare(strict_types=1);

// ColombiaPublic SDK utility: feature_add

class ColombiaPublicFeatureAdd
{
    public static function call(ColombiaPublicContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
