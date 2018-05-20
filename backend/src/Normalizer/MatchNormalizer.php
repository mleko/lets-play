<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer;


class MatchNormalizer extends PartialNormalizer
{
    /**
     * @inheritDoc
     * @param \Mleko\LetsPlay\Entity\Match $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "id" => $this->subNormalize($value->getId(), $format, $context),
            "startDate" => $value->getStartDate()->format("c"),
            "home" => $this->subNormalize($value->getHome(), $format, $context),
            "away" => $this->subNormalize($value->getAway(), $format, $context),
            "locked" => $value->isLocked()
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
        return \Mleko\LetsPlay\Entity\Match::class === $type->getName();
    }

}
