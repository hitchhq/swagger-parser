# Change Log
All notable changes will be documented in this file.
Swagger Parser adheres to [Semantic Versioning](http://semver.org/).


## [v4.0.0-beta.2](https://github.com/BigstickCarpet/swagger-parser/tree/v4.0.0-beta.2) (2016-04-25)

#### Just one small fix
Fixed [issue #13](https://github.com/BigstickCarpet/json-schema-ref-parser/issues/13).  You can now pass a URL _and_ an object to any method.

```javascript
SwaggerParser.validate("http://example.com/my-schema.json", mySchemaObject, {})
```

> **NOTE:** As shown in the example above, you _must_ also pass an options object (even an empty object will work), otherwise, the method signature looks like you're just passing a URL and options.

[Full Changelog](https://github.com/BigstickCarpet/swagger-parser/compare/v4.4.0-beta.1...v4.0.0-beta.2)

## [v4.0.0-beta.1](https://github.com/BigstickCarpet/swagger-parser/tree/v4.0.0-beta.1) (2016-04-10)

#### Plug-ins !!!
That's the major new feature in this version. Originally requested in [PR #8](https://github.com/BigstickCarpet/json-schema-ref-parser/pull/8), and refined a few times over the past few months, the plug-in API is now finalized and ready to use. You can now define your own [resolvers](https://github.com/BigstickCarpet/json-schema-ref-parser/blob/v3.0.0/docs/plugins/resolvers.md) and [parsers](https://github.com/BigstickCarpet/json-schema-ref-parser/blob/v3.0.0/docs/plugins/parsers.md).

#### Breaking Changes
The available [options have changed](https://github.com/BigstickCarpet/swagger-parser/blob/releases/4.0.0/docs/options.md), mostly due to the new plug-in API.  There's not a one-to-one mapping of old options to new options, so you'll have to read the docs and determine which options you need to set. If any. The out-of-the-box configuration works for most people.

All of the [caching options have been removed](https://github.com/BigstickCarpet/json-schema-ref-parser/commit/1f4260184bfd370e9cd385b523fb08c098fac6db). Instead, files are now cached by default, and the entire cache is reset for each new parse operation. Caching options may come back in a future release, if there is enough demand for it. If you used the old caching options, please open an issue and explain your use-case and requirements.  I need a better understanding of what caching functionality is actually needed by users.

#### Bug Fixes
Lots of little bug fixes, and a couple major bug fixes:
- [completely rewrote the bundling logic](https://github.com/BigstickCarpet/json-schema-ref-parser/commit/32510a38a29723fb24f56d30f055e7358acdd935) to fix [issue #16](https://github.com/BigstickCarpet/swagger-parser/issues/16)
- Added support for [root-level `$ref`s](https://github.com/BigstickCarpet/json-schema-ref-parser/issues/16)

[Full Changelog](https://github.com/BigstickCarpet/swagger-parser/compare/v3.3.0...v4.0.0-beta.1)


## [v3.3.0](https://github.com/BigstickCarpet/swagger-parser/tree/v3.3.0) (2015-10-02)

Updated to the latest version of [the Official Swagger 2.0 Schema](https://www.npmjs.com/package/swagger-schema-official).  The schema [hadn't been updated for six months](https://github.com/swagger-api/swagger-spec/issues/335), so Swagger Parser was missing [several recent changes](https://github.com/swagger-api/swagger-spec/commits/master/schemas/v2.0/schema.json).

[Full Changelog](https://github.com/BigstickCarpet/swagger-parser/compare/v3.2.0...v3.3.0)


## [v3.2.0](https://github.com/BigstickCarpet/swagger-parser/tree/v3.2.0) (2015-10-01)

Swagger Parser now uses [call-me-maybe](https://www.npmjs.com/package/call-me-maybe) to support [promises or callbacks](https://github.com/BigstickCarpet/swagger-parser/tree/master/docs#callbacks-vs-promises).

[Full Changelog](https://github.com/BigstickCarpet/swagger-parser/compare/v3.1.0...v3.2.0)


## [v3.1.0](https://github.com/BigstickCarpet/swagger-parser/tree/v3.1.0) (2015-09-28)

Fixed several bugs with circular references, particularly with the [`validate()`](https://github.com/BigstickCarpet/swagger-parser/blob/master/docs/swagger-parser.md#validateapi-options-callback) method.

Added a new [`$refs.circular` option](https://github.com/BigstickCarpet/swagger-parser/blob/master/docs/options.md) to determine how circular references are handled.  Options are fully-dereferencing them (default), throwing an error, or ignoring them.

[Full Changelog](https://github.com/BigstickCarpet/swagger-parser/compare/v3.0.0...v3.1.0)


## [v3.0.0](https://github.com/BigstickCarpet/swagger-parser/tree/v3.0.0) (2015-09-25)

This is a **complete rewrite** of Swagger Parser.  Major changes include:

**Swagger 2.0 Compliant**<br>
Previous versions of Swagger Parser were based on early drafts of Swagger 2.0, and were not compliant with [the final version of the spec](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md).  Swagger Parser v3.0 is now compliant with the final spec as well as related specs, such as [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) and [JSON Pointer](https://tools.ietf.org/html/rfc6901)

**All-New API**<br>
The old API only had a single method: `parse()`.  But depending on which options you passed it, the method did _much_ more than its name implied.  The new API has separate methods to make things a bit more intuitive.  The most commonly used will be [`validate()`](https://github.com/BigstickCarpet/swagger-parser/blob/master/docs/swagger-parser.md#validateapi-options-callback), [`bundle()`](https://github.com/BigstickCarpet/swagger-parser/blob/master/docs/swagger-parser.md#bundleapi-options-callback), and [`dereference()`](https://github.com/BigstickCarpet/swagger-parser/blob/master/docs/swagger-parser.md#dereferenceapi-options-callback).  The [`parse()`](https://github.com/BigstickCarpet/swagger-parser/blob/master/docs/swagger-parser.md#parseapi-options-callback) and [`resolve()`](https://github.com/BigstickCarpet/swagger-parser/blob/master/docs/swagger-parser.md#resolveapi-options-callback) methods are also available, but these are mostly just for internal use by the other methods.

**Asynchronous API**<br>
The old API was "asynchronous", but it relied on global state, so it did not support multiple simultaneous operations.  The new API is truly asynchronous and supports both [ES6 Promises](http://javascriptplayground.com/blog/2015/02/promises/) and Node-style callbacks.

**New JSON Schema Validator**<br>
Swagger Parser has switched from [tv4](https://github.com/geraintluff/tv4) to [Z-Schema](https://github.com/zaggino/z-schema), which is [faster](https://rawgit.com/zaggino/z-schema/master/benchmark/results.html) and performs [more accurate validation](https://github.com/ebdrup/json-schema-benchmark#test-failure-summary).  This means that some APIs that previously passed validation will now fail.  But that's a _good_ thing!

[Full Changelog](https://github.com/BigstickCarpet/swagger-parser/compare/v2.5.0...v3.0.0)
