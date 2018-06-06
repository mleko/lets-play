<?php

declare(strict_types=1);

namespace Mleko\LetsPlay\Http;

class Response
{
    /** @var bool */
    private $success;

    /** @var mixed */
    private $data;
    /**
     * @var int
     */
    private $statusCode;

    public function __construct($data, bool $success = true, int $statusCode = 200) {
        $this->success = $success;
        $this->data = $data;
        $this->statusCode = $statusCode;
    }

    public function isSuccess(): bool {
        return $this->success;
    }

    /**
     * @return mixed
     */
    public function getData() {
        return $this->data;
    }

    /**
     * @return int
     */
    public function getStatusCode(): int {
        return $this->statusCode;
    }
}
