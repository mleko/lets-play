<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer;


class UuidNormalizer extends PartialNormalizer
{
    /**
     * @inheritDoc
     * @param \Mleko\LetsPlay\ValueObject\Uuid $value
     */
    public function normalize($value, string $format, array $context = []) {
        return $value->getUuid();
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, \Mleko\Alchemist\Type $type, string $format, array $context = []) {
        return new \Mleko\LetsPlay\ValueObject\Uuid($data);
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return \Mleko\LetsPlay\ValueObject\Uuid::class === $type->getName();
    }


}
