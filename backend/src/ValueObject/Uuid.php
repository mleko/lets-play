<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\ValueObject;


class Uuid
{
    /** @var Uuid[] */
    private static $uuids = [];
    /** @var string */
    private $uuid;

    /**
     * Uuid constructor.
     * @param string|null $uuid
     */
    public function __construct($uuid = null) {
        if (null === $uuid) {
            $this->uuid = \Ramsey\Uuid\Uuid::uuid4()->toString();
        } else {

            if (!\Ramsey\Uuid\Uuid::isValid($uuid)) {
                throw new \InvalidArgumentException("Invalid UUID: $uuid");
            }
            $this->uuid = \Ramsey\Uuid\Uuid::fromString($uuid)->toString();
        }
    }

    public static function fromString(string $uuid): Uuid {
        if (!\array_key_exists($uuid, self::$uuids)) {
            $normalized = \Ramsey\Uuid\Uuid::fromString($uuid)->toString();
            if (!\array_key_exists($normalized, self::$uuids)) {
                self::$uuids[$normalized] = new Uuid($normalized);
            }
            self::$uuids[$uuid] = self::$uuids[$normalized];
        }
        return self::$uuids[$uuid];
    }

    /**
     * @return string
     */
    public function getUuid() {
        return $this->uuid;
    }

    public function __toString() {
        return $this->uuid;
    }

    public function equals($uuid): bool {
        if (!($uuid instanceof Uuid)) {
            return false;
        }
        return $uuid->uuid === $this->uuid;
    }

}
