<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer;


class DummyNormalizer implements \Mleko\Alchemist\Normalizer
{

    /**
     * @param mixed $value
     * @param string $format
     * @param array $context
     * @return array|integer|double|string|boolean|null
     */
    public function normalize($value, string $format, array $context = []) {
        return $value;
    }

    /**
     * @param array|integer|double|string|boolean|null $data
     * @param \Mleko\Alchemist\Type $type
     * @param string $format
     * @param array $context
     * @return mixed
     */
    public function denormalize($data, \Mleko\Alchemist\Type $type, string $format, array $context = []) {
        return $data;
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return true;
    }
}
