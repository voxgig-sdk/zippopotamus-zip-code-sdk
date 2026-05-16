<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK utility: feature_add

class ZippopotamusZipCodeFeatureAdd
{
    public static function call(ZippopotamusZipCodeContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
