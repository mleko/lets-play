<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer\ValueObject;


class MatchScoreNormalizer implements \Mleko\Alchemist\Normalizer
{

    /**
     * @inheritDoc
     * @param \Mleko\LetsPlay\ValueObject\MatchScore $value
     */
    public function normalize($value, string $format, array $context = []) {
        return [
            "home" => $value->getHome(),
            "away" => $value->getAway(),
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
        return new \Mleko\LetsPlay\ValueObject\MatchScore(
            (int)$data["home"],
            (int)$data["away"]
        );
    }

    public function canProcess(\Mleko\Alchemist\Type $type, string $format): bool {
        return \Mleko\LetsPlay\ValueObject\MatchScore::class === $type->getName();
    }
}
