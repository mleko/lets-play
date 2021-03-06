<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Storage;


use Mleko\LetsPlay\Persistence\Storage;

class JsonStorage implements Storage
{
    /** @var string */
    private $filename;

    /**
     * JsonStorage constructor.
     * @param string $filename
     */
    public function __construct(string $filename) {
        $this->filename = $filename;
    }

    public function getData(): array {
        if (!\file_exists($this->filename)) {
            \touch($this->filename);
        }
        return \json_decode(\file_get_contents($this->filename), true) ?: [];
    }

    public function saveData(array $data) {
        \file_put_contents($this->filename, \json_encode($data, JSON_PRETTY_PRINT));
    }
}
