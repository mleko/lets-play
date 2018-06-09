<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Storage;


use Mleko\LetsPlay\Persistence\Storage;

class InMemoryStorage implements Storage
{

    private $data;

    /**
     * InMemoryStorage constructor.
     * @param array $data
     */
    public function __construct(array $data) {
        $this->data = $data;
    }

    public function getData(): array {
        return $this->data;
    }

    public function saveData(array $data) {
        $this->data = $data;
    }
}
