<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Tests\Normalizer\ValueObject;

use Mleko\Alchemist\Type;
use Mleko\LetsPlay\Normalizer\ValueObject\DateTimeNormalizer;
use PHPUnit\Framework\TestCase;

class DateTimeNormalizerTest extends TestCase
{

    public function testNormalize() {

    }

    public function testDenormalize() {
        $normalizer = new DateTimeNormalizer();
        /** @var \DateTimeImmutable $datetime */
        $datetime = $normalizer->denormalize("2018-05-19T12:33:51+00:00", Type::fromString(\DateTimeImmutable::class), "");
        $this->assertEquals(1526733231, $datetime->getTimestamp());
    }

    public function testCanProcess() {
        $normalizer = new DateTimeNormalizer();
        $this->assertTrue($normalizer->canProcess(Type::fromString(\DateTimeImmutable::class), ""));
    }


}
