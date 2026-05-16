<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK utility: prepare_body

class ZippopotamusZipCodePrepareBody
{
    public static function call(ZippopotamusZipCodeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
