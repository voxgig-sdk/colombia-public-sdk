# ColombiaPublic SDK utility: make_context

from core.context import ColombiaPublicContext


def make_context_util(ctxmap, basectx):
    return ColombiaPublicContext(ctxmap, basectx)
