<?php
declare(strict_types=1);

// ColombiaPublic SDK utility: result_headers

class ColombiaPublicResultHeaders
{
    public static function call(ColombiaPublicContext $ctx): ?ColombiaPublicResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
