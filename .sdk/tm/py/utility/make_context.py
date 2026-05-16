# ZippopotamusZipCode SDK utility: make_context

from core.context import ZippopotamusZipCodeContext


def make_context_util(ctxmap, basectx):
    return ZippopotamusZipCodeContext(ctxmap, basectx)
