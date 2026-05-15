<?php
declare(strict_types=1);

// ColombiaPublic SDK utility: result_body

class ColombiaPublicResultBody
{
    public static function call(ColombiaPublicContext $ctx): ?ColombiaPublicResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
