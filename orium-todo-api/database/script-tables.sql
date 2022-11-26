create schema todo;

CREATE TABLE todo."users"
(
    id serial NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "date_created" timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS todo."users"
    OWNER to postgres;


CREATE TABLE todo.list
(
    id serial NOT NULL,
    name text NOT NULL,
    users_id serial NOT NULL,
    date_created timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT users_id_fk_constraint FOREIGN KEY (users_id)
        REFERENCES todo."users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS todo.list
    OWNER to postgres;


CREATE TABLE todo.list_item
(
    id serial NOT NULL,
    item text NOT NULL,
    list_id serial NOT NULL,
    date_created time with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT list_id_fk_constraint FOREIGN KEY (list_id)
        REFERENCES todo.list (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS todo.list_item
    OWNER to postgres;


-- Table: todo.list

-- DROP TABLE IF EXISTS todo.list;

CREATE TABLE IF NOT EXISTS todo.list
(
    id integer NOT NULL DEFAULT nextval('todo.list_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL DEFAULT nextval('todo.list_user_id_seq'::regclass),
    date_created timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT list_pkey PRIMARY KEY (id),
    CONSTRAINT user_id_fk_constraint FOREIGN KEY (user_id)
        REFERENCES todo.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS todo.list
    OWNER to postgres;
	

-- Table: todo.list_item

-- DROP TABLE IF EXISTS todo.list_item;

CREATE TABLE IF NOT EXISTS todo.list_item
(
    id integer NOT NULL DEFAULT nextval('todo.list_item_id_seq'::regclass),
    item text COLLATE pg_catalog."default" NOT NULL,
    list_id integer NOT NULL DEFAULT nextval('todo.list_item_list_id_seq'::regclass),
    date_created time with time zone NOT NULL DEFAULT now(),
    CONSTRAINT list_item_pkey PRIMARY KEY (id),
    CONSTRAINT list_id_fk_constraint FOREIGN KEY (list_id)
        REFERENCES todo.list (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS todo.list_item
    OWNER to postgres;

