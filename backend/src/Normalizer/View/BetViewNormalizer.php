<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer\View;


use Mleko\LetsPlay\View\BetView;

class BetViewNormalizer extends \Mleko\LetsPlay\Normalizer\PartialNormalizer
{

    /**
     * @inheritdoc
     * @param BetView $value
     */
    public function normalize($value, string $format, array $context = []) {
        $data = $this->subNormalize($value->getBet(), $format, $context);
        $data["points"] = $value->getPoints();
        return $data;
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
        return BetView::class === $type->getName();
    }
}
