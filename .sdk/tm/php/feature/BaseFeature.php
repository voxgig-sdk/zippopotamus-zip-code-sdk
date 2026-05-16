<?php
declare(strict_types=1);

// ZippopotamusZipCode SDK base feature

class ZippopotamusZipCodeBaseFeature
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

    public function init(ZippopotamusZipCodeContext $ctx, array $options): void {}
    public function PostConstruct(ZippopotamusZipCodeContext $ctx): void {}
    public function PostConstructEntity(ZippopotamusZipCodeContext $ctx): void {}
    public function SetData(ZippopotamusZipCodeContext $ctx): void {}
    public function GetData(ZippopotamusZipCodeContext $ctx): void {}
    public function GetMatch(ZippopotamusZipCodeContext $ctx): void {}
    public function SetMatch(ZippopotamusZipCodeContext $ctx): void {}
    public function PrePoint(ZippopotamusZipCodeContext $ctx): void {}
    public function PreSpec(ZippopotamusZipCodeContext $ctx): void {}
    public function PreRequest(ZippopotamusZipCodeContext $ctx): void {}
    public function PreResponse(ZippopotamusZipCodeContext $ctx): void {}
    public function PreResult(ZippopotamusZipCodeContext $ctx): void {}
    public function PreDone(ZippopotamusZipCodeContext $ctx): void {}
    public function PreUnexpected(ZippopotamusZipCodeContext $ctx): void {}
}
