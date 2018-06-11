<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Infrastructure\Doctrine\Type;


use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

class DateTimeTzType extends Type
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
        return "datetime_tz_m";
    }

    /**
     * @inheritDoc
     */
    public function convertToDatabaseValue($value, AbstractPlatform $platform) {
        if (null === $value) {
            return null;
        }
        if ($value instanceof \DateTimeInterface) {
            $value = $value instanceof \DateTime ? \DateTimeImmutable::createFromMutable($value) : $value;
            $value = $value->setTimezone(new \DateTimeZone("UTC"));
            return $value->format(\DateTime::ISO8601);
        }
        throw new \RuntimeException("Invalid Date");
    }

    /**
     * @inheritDoc
     */
    public function convertToPHPValue($value, AbstractPlatform $platform) {
        if (null === $value || "" === $value) {
            return null;
        }
        if ($value instanceof \DateTime) {
            return \DateTimeImmutable::createFromMutable($value);
        } elseif ($value instanceof \DateTimeImmutable) {
            return $value;
        }
        return \DateTimeImmutable::createFromFormat(\DateTime::ISO8601, $value);
    }


}
