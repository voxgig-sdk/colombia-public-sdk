<?php
declare(strict_types=1);

// ColombiaPublic SDK utility: prepare_body

class ColombiaPublicPrepareBody
{
    public static function call(ColombiaPublicContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
