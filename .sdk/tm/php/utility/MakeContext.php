<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ZippopotamusZipCodeMakeContext
{
    public static function call(array $ctxmap, ?ZippopotamusZipCodeContext $basectx): ZippopotamusZipCodeContext
    {
        return new ZippopotamusZipCodeContext($ctxmap, $basectx);
    }
}
