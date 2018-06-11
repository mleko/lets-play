<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Infrastructure\Doctrine\Type;


use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;
use Mleko\LetsPlay\ValueObject\Uuid;

class UuidType extends Type
{

    /**
     * Gets the SQL declaration snippet for a field of this type.
     *
     * @param array $fieldDeclaration The field declaration.
     * @param \Doctrine\DBAL\Platforms\AbstractPlatform $platform The currently used database platform.
     *
     * @return string
     */
    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform) {
        $platform->getGuidTypeDeclarationSQL($fieldDeclaration);
    }

    /**
     * Gets the name of this type.
     *
     * @return string
     */
    public function getName() {
        return "uuid";
    }

    /**
     * @inheritDoc
     */
    public function convertToDatabaseValue($value, AbstractPlatform $platform) {
        if (null === $value) {
            return null;
        }
        if ($value instanceof Uuid) {
            return $value->getUuid();
        }
        if(\is_string($value)){
            return Uuid::fromString($value)->getUuid();
        }
        throw new \RuntimeException("Invalid UUID");
    }

    /**
     * @inheritDoc
     */
    public function convertToPHPValue($value, AbstractPlatform $platform) {
        if (null === $value || "" === $value) {
            return null;
        }
        if ($value instanceof Uuid) {
            return $value;
        }
        return Uuid::fromString($value);
    }


}
