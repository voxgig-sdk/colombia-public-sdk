<?php
declare(strict_types=1);

// ColombiaPublic SDK base feature

class ColombiaPublicBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ColombiaPublicContext $ctx, array $options): void {}
    public function PostConstruct(ColombiaPublicContext $ctx): void {}
    public function PostConstructEntity(ColombiaPublicContext $ctx): void {}
    public function SetData(ColombiaPublicContext $ctx): void {}
    public function GetData(ColombiaPublicContext $ctx): void {}
    public function GetMatch(ColombiaPublicContext $ctx): void {}
    public function SetMatch(ColombiaPublicContext $ctx): void {}
    public function PrePoint(ColombiaPublicContext $ctx): void {}
    public function PreSpec(ColombiaPublicContext $ctx): void {}
    public function PreRequest(ColombiaPublicContext $ctx): void {}
    public function PreResponse(ColombiaPublicContext $ctx): void {}
    public function PreResult(ColombiaPublicContext $ctx): void {}
    public function PreDone(ColombiaPublicContext $ctx): void {}
    public function PreUnexpected(ColombiaPublicContext $ctx): void {}
}
