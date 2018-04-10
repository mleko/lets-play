<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Normalizer;


use Mleko\Alchemist\Normalizer\NormalizerAware;

abstract class PartialNormalizer implements \Mleko\Alchemist\Normalizer, NormalizerAware
{
    /** @var \Mleko\Alchemist\Normalizer|null */
    private $subNormalizer;

    public function setNormalizer(\Mleko\Alchemist\Normalizer $normalizer): void {
        $this->subNormalizer = $normalizer;
    }

    public function getSubNormalizer(): ?\Mleko\Alchemist\Normalizer {
        return $this->subNormalizer;
    }

    protected function subNormalize($value, string $format, array $context) {
        if (null === $this->subNormalizer) {
            throw new \RuntimeException("Cannot normalize array without subNormalizer");
        }
        return $this->subNormalizer->normalize($value, $format, $context);
    }

}
