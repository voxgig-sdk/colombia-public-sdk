# ColombiaPublic SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ColombiaPublicUtility.registrar = ->(u) {
  u.clean = ColombiaPublicUtilities::Clean
  u.done = ColombiaPublicUtilities::Done
  u.make_error = ColombiaPublicUtilities::MakeError
  u.feature_add = ColombiaPublicUtilities::FeatureAdd
  u.feature_hook = ColombiaPublicUtilities::FeatureHook
  u.feature_init = ColombiaPublicUtilities::FeatureInit
  u.fetcher = ColombiaPublicUtilities::Fetcher
  u.make_fetch_def = ColombiaPublicUtilities::MakeFetchDef
  u.make_context = ColombiaPublicUtilities::MakeContext
  u.make_options = ColombiaPublicUtilities::MakeOptions
  u.make_request = ColombiaPublicUtilities::MakeRequest
  u.make_response = ColombiaPublicUtilities::MakeResponse
  u.make_result = ColombiaPublicUtilities::MakeResult
  u.make_point = ColombiaPublicUtilities::MakePoint
  u.make_spec = ColombiaPublicUtilities::MakeSpec
  u.make_url = ColombiaPublicUtilities::MakeUrl
  u.param = ColombiaPublicUtilities::Param
  u.prepare_auth = ColombiaPublicUtilities::PrepareAuth
  u.prepare_body = ColombiaPublicUtilities::PrepareBody
  u.prepare_headers = ColombiaPublicUtilities::PrepareHeaders
  u.prepare_method = ColombiaPublicUtilities::PrepareMethod
  u.prepare_params = ColombiaPublicUtilities::PrepareParams
  u.prepare_path = ColombiaPublicUtilities::PreparePath
  u.prepare_query = ColombiaPublicUtilities::PrepareQuery
  u.result_basic = ColombiaPublicUtilities::ResultBasic
  u.result_body = ColombiaPublicUtilities::ResultBody
  u.result_headers = ColombiaPublicUtilities::ResultHeaders
  u.transform_request = ColombiaPublicUtilities::TransformRequest
  u.transform_response = ColombiaPublicUtilities::TransformResponse
}
