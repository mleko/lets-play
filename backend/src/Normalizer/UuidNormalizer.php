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
        // TODO: Implement denormalize() method.
        throw new \RuntimeException("Unimplemented method " . __CLASS__ . "::" . __METHOD__);
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return \Mleko\LetsPlay\ValueObject\Uuid::class === $type->getName();
    }


}
