<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer;


class MatchSetNormalizer extends PartialNormalizer
{
    /**
     * @inheritDoc
     * @param \Mleko\LetsPlay\Entity\MatchSet $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "id" => $this->subNormalize($value->getId(), $format, $context),
            "name" => $value->getName(),
            "matches" => $this->subNormalize($value->getMatches(), $format, $context)
        ];
    }

    /**
     * @inheritDoc
     */
    public function denormalize($data, \Mleko\Alchemist\Type $type, string $format, array $context = []) {
        // TODO: Implement denormalize() method.
        throw new \RuntimeException("Unimplemented method " . __CLASS__ . "::" . __METHOD__);
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return \Mleko\LetsPlay\Entity\MatchSet::class === $type->getName();
    }

}
