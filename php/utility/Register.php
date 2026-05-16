<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK utility registration

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

ZippopotamusZipCodeUtility::setRegistrar(function (ZippopotamusZipCodeUtility $u): void {
    $u->clean = [ZippopotamusZipCodeClean::class, 'call'];
    $u->done = [ZippopotamusZipCodeDone::class, 'call'];
    $u->make_error = [ZippopotamusZipCodeMakeError::class, 'call'];
    $u->feature_add = [ZippopotamusZipCodeFeatureAdd::class, 'call'];
    $u->feature_hook = [ZippopotamusZipCodeFeatureHook::class, 'call'];
    $u->feature_init = [ZippopotamusZipCodeFeatureInit::class, 'call'];
    $u->fetcher = [ZippopotamusZipCodeFetcher::class, 'call'];
    $u->make_fetch_def = [ZippopotamusZipCodeMakeFetchDef::class, 'call'];
    $u->make_context = [ZippopotamusZipCodeMakeContext::class, 'call'];
    $u->make_options = [ZippopotamusZipCodeMakeOptions::class, 'call'];
    $u->make_request = [ZippopotamusZipCodeMakeRequest::class, 'call'];
    $u->make_response = [ZippopotamusZipCodeMakeResponse::class, 'call'];
    $u->make_result = [ZippopotamusZipCodeMakeResult::class, 'call'];
    $u->make_point = [ZippopotamusZipCodeMakePoint::class, 'call'];
    $u->make_spec = [ZippopotamusZipCodeMakeSpec::class, 'call'];
    $u->make_url = [ZippopotamusZipCodeMakeUrl::class, 'call'];
    $u->param = [ZippopotamusZipCodeParam::class, 'call'];
    $u->prepare_auth = [ZippopotamusZipCodePrepareAuth::class, 'call'];
    $u->prepare_body = [ZippopotamusZipCodePrepareBody::class, 'call'];
    $u->prepare_headers = [ZippopotamusZipCodePrepareHeaders::class, 'call'];
    $u->prepare_method = [ZippopotamusZipCodePrepareMethod::class, 'call'];
    $u->prepare_params = [ZippopotamusZipCodePrepareParams::class, 'call'];
    $u->prepare_path = [ZippopotamusZipCodePreparePath::class, 'call'];
    $u->prepare_query = [ZippopotamusZipCodePrepareQuery::class, 'call'];
    $u->result_basic = [ZippopotamusZipCodeResultBasic::class, 'call'];
    $u->result_body = [ZippopotamusZipCodeResultBody::class, 'call'];
    $u->result_headers = [ZippopotamusZipCodeResultHeaders::class, 'call'];
    $u->transform_request = [ZippopotamusZipCodeTransformRequest::class, 'call'];
    $u->transform_response = [ZippopotamusZipCodeTransformResponse::class, 'call'];
});
