<?php
declare(strict_types=1);

// ColombiaPublic SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ColombiaPublicMakeContext
{
    public static function call(array $ctxmap, ?ColombiaPublicContext $basectx): ColombiaPublicContext
    {
        return new ColombiaPublicContext($ctxmap, $basectx);
    }
}
