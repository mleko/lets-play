<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;


use Mleko\Alchemist\Normalizer;

abstract class StorageRepository
{
    /** @var JsonStorage */
    private $storage;
    /** @var Normalizer */
    private $normalizer;

    /**
     * UserRepository constructor.
     * @param JsonStorage $storage
     * @param Normalizer $normalizer
     */
    public function __construct(JsonStorage $storage, Normalizer $normalizer) {
        $this->storage = $storage;
        $this->normalizer = $normalizer;
    }

    abstract protected function getElementClassName(): string;

    abstract protected function getStorageKey(): string;

    protected function getElements() {
        $data = $this->storage->getData();
        return $this->normalizer->denormalize($data[$this->getStorageKey()] ?? [], \Mleko\Alchemist\Type::fromString("array<" . $this->getElementClassName() . ">"), "raw");
    }

    protected function saveElements(array $elements) {
        $data = $this->storage->getData();
        $data[$this->getStorageKey()] = $this->normalizer->normalize($elements, "raw");
        $this->storage->saveData($data);
    }
}
