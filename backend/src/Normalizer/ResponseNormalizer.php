<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer;


class ResponseNormalizer extends PartialNormalizer
{

    /**
     * @param \Mleko\LetsPlay\Http\Response $value
     * @param string $format
     * @param array $context
     * @return array|integer|double|string|boolean|null
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "success" => $value->isSuccess(),
            "data"    => $this->subNormalize($value->getData(), $format, $context)
        ];
    }

    /**
     * @param array|integer|double|string|boolean|null $data
     * @param \Mleko\Alchemist\Type $type
     * @param string $format
     * @param array $context
     * @return mixed
     */
    public function denormalize($data, \Mleko\Alchemist\Type $type, string $format, array $context = []) {
        // TODO: Implement denormalize() method.
        throw new \RuntimeException("Unimplemented method " . __CLASS__ . "::" . __METHOD__);
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return $type->getName() === \Mleko\LetsPlay\Http\Response::class;
    }
}
