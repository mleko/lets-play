<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer\ValueObject;


class DateTimeNormalizer implements \Mleko\Alchemist\Normalizer
{

    /**
     * @inheritDoc
     * @param \DateTimeImmutable $value
     */
    public function normalize($value, string $format, array $context = []) {
        return $value->format("c");
    }

    /**
     * @param array|integer|double|string|boolean|null $data
     * @param \Mleko\Alchemist\Type $type
     * @param string $format
     * @param array $context
     * @return mixed
     */
    public function denormalize($data, \Mleko\Alchemist\Type $type, string $format, array $context = []) {
        return \DateTimeImmutable::createFromFormat("Y-m-d\TH:i:sP", $data);
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return \DateTimeImmutable::class === $type->getName();
    }
}
