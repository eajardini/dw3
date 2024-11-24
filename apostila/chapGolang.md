---
theme: default
paginate: true
marp: true
title: Servidor Back End em Go (Golang)
author: "Evandro Jardini"
---



# <center> Servidor __Back End__ em Go (_Golang_) </center>

---

## Introdução
**Go**, também conhecida como **Golang**, é uma linguagem de programação de código aberto criada pela Google. Desenvolvida com o objetivo de oferecer uma linguagem simples, eficiente e confiável, Go rapidamente se tornou uma escolha popular para diversos tipos de projetos, desde desenvolvimento web até sistemas distribuídos.

---

## Características da Go
Seguem algumas das características da linugagem Go
-   **Simplicidade:** Go possui uma sintaxe clara e concisa, facilitando o aprendizado e a escrita de código.

-   **Eficiência:** Compilada em código de máquina, Go gera executables rápidos e otimizados.

-   **Tipagem estática:** A tipagem estática ajuda a prevenir erros comuns em tempo de compilação.

-   **Garbage collector:** Gerenciamento automático de memória, liberando o desenvolvedor da tarefa de alocar e desalocar memória manualmente.

---

## Áreas de aplicação
**Go** é utilizada em diversas áreas, incluindo:

-   **Desenvolvimento web:** Criação de servidores web, APIs e microsserviços.

-   **Sistemas distribuídos:** Desenvolvimento de sistemas altamente escaláveis e resilientes.

-   **Cloud computing:** Construção de aplicações em nuvem. 

-   **Data science:** Análise de dados e machine learning.

---

## Começando com Go
Para começar a programar em Go, você precisará:

1.  **Instalar o Go:** Baixe e instale o compilador Go para o seu sistema operacional em [https://golang.org/dl/](https://golang.org/dl/).
2. **Acrescentar *Path* da linguagem:** No arquivo */etc/profile,* acrescente as linhas: 
	~~~Bash
	PATH="$PATH:/opt/go/bin"
	export PATH
	~~~
---

3. **Testar a instalação:** Para testar se a Go foi instalada, digite *go version*

4.  **Escrever seu primeiro programa:** Crie um arquivo com extensão `.go` e escreva seu código.

5.  **Compilar e executar:** Utilize o comando `go run` para compilar e executar seu programa.

---

### Exemplo:
~~~Go
//	@file:hello.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}
~~~
Para **executar**, digite:  
```bash
go run hello.go
```

Para **compilar**, digite:  
```bash
go build hello.go
```

---

## Exemplos de códigos em Go
Seguem exemplos de códigos em Go para familiarização com a linguagem. Mais exemplos podem ser vistos em [Go by Example](https://gobyexample.com/)

---

### Escrevendo valores
```go
package main

import "fmt"

func main() {

    fmt.Println("go" + "lang")

    fmt.Println("1+1 =", 1+1)
    fmt.Println("7.0/3.0 =", 7.0/3.0)

    fmt.Println(true && false)
    fmt.Println(true || false)
    fmt.Println(!true)
}
```
---

### Declaração e uso de variáveis
~~~go
package main

import "fmt"

func main() {

    var a = "initial"
    fmt.Println(a)

    var b, c int = 1, 2
    fmt.Println(b, c)

    var d = true
    fmt.Println(d)

    var e int
    fmt.Println(e)

    f := "apple"
    fmt.Println(f)
}
~~~

---

### Laço For
~~~go
package main

import "fmt"

func main() {

    i := 1
    for i <= 3 {
        fmt.Println(i)
        i = i + 1
    }

    for j := 0; j < 3; j++ {
        fmt.Println(j)
    }

    for i := range 3 {
        fmt.Println("range", i)
    }

    for {
        fmt.Println("loop")
        break
    }

    for n := range 6 {
        if n%2 == 0 {
            continue
        }
        fmt.Println(n)
    }
}
~~~

---

### Estrutura condicional If/else
~~~go
package main

import "fmt"

func main() {

    if 7%2 == 0 {
        fmt.Println("7 is even")
    } else {
        fmt.Println("7 is odd")
    }

    if 8%4 == 0 {
        fmt.Println("8 is divisible by 4")
    }

    if 8%2 == 0 || 7%2 == 0 {
        fmt.Println("either 8 or 7 are even")
    }

    if num := 9; num < 0 {
        fmt.Println(num, "is negative")
    } else if num < 10 {
        fmt.Println(num, "has 1 digit")
    } else {
        fmt.Println(num, "has multiple digits")
    }
}
~~~

---
  
### Vetores (Arrays)
~~~Go
package main

import "fmt"

func main() {

    var a [5]int
    fmt.Println("emp:", a)

    a[4] = 100
    fmt.Println("set:", a)
    fmt.Println("get:", a[4])

    fmt.Println("len:", len(a))

    var twoD [2][3]int
    for i := 0; i < 2; i++ {
        for j := 0; j < 3; j++ {
            twoD[i][j] = i + j
        }
    }
    fmt.Println("2d: ", twoD)

    twoD = [2][3]int{
        {1, 2, 3},
        {1, 2, 3},
    }
    fmt.Println("2d: ", twoD)
}
~~~

---

### Funções
~~~Go
package main

import "fmt"

func plus(a int, b int) int {

    return a + b
}

func plusPlus(a, b, c int) int {
    return a + b + c
}

func main() {

    res := plus(1, 2)
    fmt.Println("1+2 =", res)

    res = plusPlus(1, 2, 3)
    fmt.Println("1+2+3 =", res)
}
~~~

---

### Funções com múltiplos retornos
~~~Go
package main

import "fmt"

func vals() (int, int) {
    return 3, 7
}

func main() {

    a, b := vals()
    fmt.Println(a)
    fmt.Println(b)

    _, c := vals()
    fmt.Println(c)
}
~~~

---

### Estruturas (structs)
~~~Go
package main

import "fmt"

type person struct {
    name string
    age  int
}

func main() {

    s := person{name: "Sean", age: 50}
    fmt.Println(s.name)
    
    fmt.Println(s.age)

    dog := struct {
        name   string
        isGood bool
    }{
        "Rex",
        true,
    }
    fmt.Println(dog)
}
~~~
---
## Framework Echo
- O *Echo* <https://echo.labstack.com/>  é um framework web de alto desempenho e extensível para a linguagem Go (Golang).   

- Foi projetado para simplificar o desenvolvimento de aplicações web, oferecendo uma API simples, intuitiva e flexível. 

- Conhecido por sua velocidade, o *Echo* se destaca por ser leve e eficiente, tornando-se uma excelente escolha para aplicações que exigem alta performance e baixa latência.   


A seguir, vamos a alguns exemplos do uso deste framework

---

### Hello word usando o Echo
Antes de rodamos o _hello word_, vamos organizar nossos programas Golang usando *módulos*. Esse recurso permite que bibliotecas instaladas para um determinado sistema não afete outros sistemas. A biblioteca será instalada somente no módulo que a necessitar.  

Para isso faça:
1 - No diretório do Hello Word, inicie o uso de módulos da seguinte forma:
```bash
go mod init hello
```
2 - Note que foram criados os arquivos _go.mod_ e _go.sum_.
3 - Escreva o programa hello word e depois salve-o
4 - Por fim, rode:
```bash
go mod tidy
```
---
_helloword.go_
```go
package main

import (
	"net/http"
	
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":1323"))
}

```

---

Rodando o servidor:
```bash
$ go run server.go
```

---
Uma outra maneira de declarar os métodos http é criar funções separadas e usar seus nomes dentro do método:
```go
package main

import (
	"net/http"
	
	"github.com/labstack/echo/v4"
)

func hello(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
}
	
func main() {
	e := echo.New()
	e.GET("/", hello)
	e.Logger.Fatal(e.Start(":1323"))
}

```
---

## <center> :+1: FIM </center>
  
---  
  
> Written with [StackEdit](https://stackedit.io/).
