
const Docs = {
    testSseContent: [{
        input: '测试',
        output: `Lorem ipsum dolor sit amet consectetur adipisicing
     elit. Veniam maxime fugiat et at iusto! Sunt quibusdam obcaecati 
     suscipit repudiandae molestias omnis dicta perferendis est quaerat  
     voluptas. Rerum ipsa totam minima.`
    }, {
        input: '您好！',
        output: `干啥？`
    }, {
        input: '查看',
        output: `\`\`\`Lorem
Lorem ipsum dolor sit, amet consectetur adipisicing 
elit. Dicta exercitationem error praesentium ducimus temporibus 
tempora quod rem cupiditate dolorum, tenetur excepturi iusto quae 
magnam omnis non debitis quibusdam beatae aperiam quos voluptas in. 
Sit voluptatem eos doloribus obcaecati blanditiis modi possimus 
beatae quod. Quae cum laboriosam autem at labore odio. At aspernatur 
cumque, temporibus corporis dolorum facilis aperiam illo quas 
perferendis aut hic maxime harum magni? Voluptatem quam quo 
voluptatum aperiam repudiandae dolores ducimus sed quaerat est 
officiis cupiditate, aut nisi id vel rerum praesentium voluptatibus 
consectetur. Assumenda, quas nemo quidem earum sunt dolore doloremque 
nisi mollitia neque exercitationem officiis dolor facilis quos aliquam 
nulla suscipit voluptates asperiores quia quis consequatur hic vel dignissimos, 
voluptas iusto! Temporibus doloribus assumenda minus magni, quae, porro modi 
nemo velit ab sit distinctio fugiat natus vel ipsam architecto consequatur 
quaerat perspiciatis? Sequi, atque quos. Itaque porro rerum veniam 
voluptate eius inventore voluptatibus, nihil vel possimus sequi ipsam, 
nemo explicabo deserunt, voluptates ullam expedita quo amet vero 
cupiditate eligendi labore molestias numquam ducimus commodi! 
Nesciunt quo cupiditate ab fugiat tempore iure, a laboriosam 
officiis delectus reiciendis. Dignissimos, possimus nihil, odit 
praesentium officiis natus sequi inventore alias saepe quis expedita 
maiores veritatis laborum qui, cupiditate id?\`\`\``
    }, {
        input: '时序图',
        output: `\`\`\`mermaid
    ---
title: Animal example
---
classDiagram
    note "From Duck till Zebra"
    Animal <|-- Duck
    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }
\`\`\``
    }, {
        input: 'js代码',
        output: `\`\`\`javascript
const test = '212986766'
function logTo () {
    console.log(test);
}
logTo()
\`\`\``
    }, {
        input: 'java代码',
        output: `\`\`\`java
public class HelloWorld {
    // 主方法，程序的入口
    public static void main(String[] args) {
        // 创建HelloWorld类的实例
        HelloWorld helloWorld = new HelloWorld();
        
        // 调用实例方法
        helloWorld.greet("World");
    }
    
    // 实例方法，用于打印问候语
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }
}
\`\`\``
    }, {
        input: 'default',
        output: `啥呀？俺不太懂耶`
    }]
}

export default Docs