-- CreateTable
CREATE TABLE "tbl_projeto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "tbl_projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_status" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "id_projeto" INTEGER NOT NULL,
    "ordem" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "tbl_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_substatus" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "id_status" INTEGER NOT NULL,
    "ordem" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "tbl_substatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_estoque" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "id_projeto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tbl_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tba_clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "id_status" INTEGER NOT NULL,
    "id_substatus" INTEGER NOT NULL,
    "entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tba_clientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_status" ADD CONSTRAINT "tbl_status_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "tbl_projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_substatus" ADD CONSTRAINT "tbl_substatus_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "tbl_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_estoque" ADD CONSTRAINT "tbl_estoque_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "tbl_projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tba_clientes" ADD CONSTRAINT "tba_clientes_id_substatus_fkey" FOREIGN KEY ("id_substatus") REFERENCES "tbl_substatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
