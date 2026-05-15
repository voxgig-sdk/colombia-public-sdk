<?php
declare(strict_types=1);

// ColombiaPublic SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ColombiaPublicUtility::setRegistrar(function (ColombiaPublicUtility $u): void {
    $u->clean = [ColombiaPublicClean::class, 'call'];
    $u->done = [ColombiaPublicDone::class, 'call'];
    $u->make_error = [ColombiaPublicMakeError::class, 'call'];
    $u->feature_add = [ColombiaPublicFeatureAdd::class, 'call'];
    $u->feature_hook = [ColombiaPublicFeatureHook::class, 'call'];
    $u->feature_init = [ColombiaPublicFeatureInit::class, 'call'];
    $u->fetcher = [ColombiaPublicFetcher::class, 'call'];
    $u->make_fetch_def = [ColombiaPublicMakeFetchDef::class, 'call'];
    $u->make_context = [ColombiaPublicMakeContext::class, 'call'];
    $u->make_options = [ColombiaPublicMakeOptions::class, 'call'];
    $u->make_request = [ColombiaPublicMakeRequest::class, 'call'];
    $u->make_response = [ColombiaPublicMakeResponse::class, 'call'];
    $u->make_result = [ColombiaPublicMakeResult::class, 'call'];
    $u->make_point = [ColombiaPublicMakePoint::class, 'call'];
    $u->make_spec = [ColombiaPublicMakeSpec::class, 'call'];
    $u->make_url = [ColombiaPublicMakeUrl::class, 'call'];
    $u->param = [ColombiaPublicParam::class, 'call'];
    $u->prepare_auth = [ColombiaPublicPrepareAuth::class, 'call'];
    $u->prepare_body = [ColombiaPublicPrepareBody::class, 'call'];
    $u->prepare_headers = [ColombiaPublicPrepareHeaders::class, 'call'];
    $u->prepare_method = [ColombiaPublicPrepareMethod::class, 'call'];
    $u->prepare_params = [ColombiaPublicPrepareParams::class, 'call'];
    $u->prepare_path = [ColombiaPublicPreparePath::class, 'call'];
    $u->prepare_query = [ColombiaPublicPrepareQuery::class, 'call'];
    $u->result_basic = [ColombiaPublicResultBasic::class, 'call'];
    $u->result_body = [ColombiaPublicResultBody::class, 'call'];
    $u->result_headers = [ColombiaPublicResultHeaders::class, 'call'];
    $u->transform_request = [ColombiaPublicTransformRequest::class, 'call'];
    $u->transform_response = [ColombiaPublicTransformResponse::class, 'call'];
});
