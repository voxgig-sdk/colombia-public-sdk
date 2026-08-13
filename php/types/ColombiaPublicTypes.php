<?php
declare(strict_types=1);

// Typed models for the ColombiaPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Airport entity data model. */
class Airport
{
    public ?int $cityId = null;
    public ?string $code = null;
    public ?int $departmentId = null;
    public ?int $id = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Request payload for Airport#load. */
class AirportLoadMatch
{
    public int $id;
}

/** Request payload for Airport#list. */
class AirportListMatch
{
    public ?int $cityId = null;
    public ?string $code = null;
    public ?int $departmentId = null;
    public ?int $id = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** CategoryNaturalArea entity data model. */
class CategoryNaturalArea
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Request payload for CategoryNaturalArea#list. */
class CategoryNaturalAreaListMatch
{
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** ConstitutionArticle entity data model. */
class ConstitutionArticle
{
    public ?int $articleNumber = null;
    public ?string $chapter = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $title = null;
}

/** Request payload for ConstitutionArticle#load. */
class ConstitutionArticleLoadMatch
{
    public int $id;
}

/** Request payload for ConstitutionArticle#list. */
class ConstitutionArticleListMatch
{
    public ?int $articleNumber = null;
    public ?string $chapter = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $title = null;
}

/** Country entity data model. */
class Country
{
    public ?string $capital = null;
    public ?string $currency = null;
    public ?string $flag = null;
    public ?int $id = null;
    public ?array $languages = null;
    public ?string $name = null;
    public ?int $population = null;
    public ?float $surface = null;
}

/** Request payload for Country#list. */
class CountryListMatch
{
    public ?string $capital = null;
    public ?string $currency = null;
    public ?string $flag = null;
    public ?int $id = null;
    public ?array $languages = null;
    public ?string $name = null;
    public ?int $population = null;
    public ?float $surface = null;
}

/** Department entity data model. */
class Department
{
    public ?string $cityCapital = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?int $municipalities = null;
    public ?string $name = null;
    public ?int $population = null;
    public ?int $regionId = null;
    public ?float $surface = null;
}

/** Request payload for Department#load. */
class DepartmentLoadMatch
{
    public int $id;
}

/** Request payload for Department#list. */
class DepartmentListMatch
{
    public ?string $cityCapital = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?int $municipalities = null;
    public ?string $name = null;
    public ?int $population = null;
    public ?int $regionId = null;
    public ?float $surface = null;
}

/** Holiday entity data model. */
class Holiday
{
    public ?string $date = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Request payload for Holiday#load. */
class HolidayLoadMatch
{
    public int $id;
}

/** Request payload for Holiday#list. */
class HolidayListMatch
{
    public ?string $date = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** InvasiveSpecie entity data model. */
class InvasiveSpecie
{
    public ?int $id = null;
    public ?string $impact = null;
    public ?string $manage = null;
    public ?string $name = null;
    public ?string $scientificName = null;
    public ?string $urlImage = null;
}

/** Request payload for InvasiveSpecie#load. */
class InvasiveSpecieLoadMatch
{
    public int $id;
}

/** Request payload for InvasiveSpecie#list. */
class InvasiveSpecieListMatch
{
    public ?int $id = null;
    public ?string $impact = null;
    public ?string $manage = null;
    public ?string $name = null;
    public ?string $scientificName = null;
    public ?string $urlImage = null;
}

/** Map entity data model. */
class Map
{
    public ?int $departmentId = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $urlImages = null;
}

/** Request payload for Map#list. */
class MapListMatch
{
    public ?int $departmentId = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $urlImages = null;
}

/** NativeCommunity entity data model. */
class NativeCommunity
{
    public ?int $departmentId = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $population = null;
}

/** Request payload for NativeCommunity#load. */
class NativeCommunityLoadMatch
{
    public int $id;
}

/** Request payload for NativeCommunity#list. */
class NativeCommunityListMatch
{
    public ?int $departmentId = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $population = null;
}

/** NaturalArea entity data model. */
class NaturalArea
{
    public ?int $areaGroupId = null;
    public ?int $categoryNaturalAreaId = null;
    public ?int $departmentId = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?float $landArea = null;
    public ?float $maritimeArea = null;
    public ?string $name = null;
}

/** Request payload for NaturalArea#load. */
class NaturalAreaLoadMatch
{
    public int $id;
}

/** Request payload for NaturalArea#list. */
class NaturalAreaListMatch
{
    public ?int $areaGroupId = null;
    public ?int $categoryNaturalAreaId = null;
    public ?int $departmentId = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?float $landArea = null;
    public ?float $maritimeArea = null;
    public ?string $name = null;
}

/** President entity data model. */
class President
{
    public ?string $description = null;
    public ?string $endPeriodDate = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $politicalParty = null;
    public ?string $startPeriodDate = null;
}

/** Request payload for President#load. */
class PresidentLoadMatch
{
    public int $id;
}

/** Request payload for President#list. */
class PresidentListMatch
{
    public ?string $description = null;
    public ?string $endPeriodDate = null;
    public ?int $id = null;
    public ?string $image = null;
    public ?string $name = null;
    public ?string $politicalParty = null;
    public ?string $startPeriodDate = null;
}

/** Radio entity data model. */
class Radio
{
    public ?string $band = null;
    public ?string $frequency = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Request payload for Radio#load. */
class RadioLoadMatch
{
    public int $id;
}

/** Request payload for Radio#list. */
class RadioListMatch
{
    public ?string $band = null;
    public ?string $frequency = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $url = null;
}

/** Region entity data model. */
class Region
{
    public ?array $departments = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** Request payload for Region#load. */
class RegionLoadMatch
{
    public int $id;
}

/** Request payload for Region#list. */
class RegionListMatch
{
    public ?array $departments = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
}

/** TouristicAttraction entity data model. */
class TouristicAttraction
{
    public ?string $city = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?array $images = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
}

/** Request payload for TouristicAttraction#load. */
class TouristicAttractionLoadMatch
{
    public int $id;
}

/** Request payload for TouristicAttraction#list. */
class TouristicAttractionListMatch
{
    public ?string $city = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?array $images = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
    public ?string $name = null;
}

/** TypicalDish entity data model. */
class TypicalDish
{
    public ?int $departmentId = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?array $ingredients = null;
    public ?string $name = null;
    public ?string $urlImage = null;
}

/** Request payload for TypicalDish#load. */
class TypicalDishLoadMatch
{
    public int $id;
}

/** Request payload for TypicalDish#list. */
class TypicalDishListMatch
{
    public ?int $departmentId = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?array $ingredients = null;
    public ?string $name = null;
    public ?string $urlImage = null;
}

