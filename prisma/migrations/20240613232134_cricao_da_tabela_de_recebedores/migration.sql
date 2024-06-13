-- CreateTable
CREATE TABLE "recebedores" (
    "id" TEXT NOT NULL,
    "nome_rasao_social" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "tipo_chave" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "recebedores_pkey" PRIMARY KEY ("id")
);
