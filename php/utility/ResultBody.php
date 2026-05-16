<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK utility: result_body

class ZippopotamusZipCodeResultBody
{
    public static function call(ZippopotamusZipCodeContext $ctx): ?ZippopotamusZipCodeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
