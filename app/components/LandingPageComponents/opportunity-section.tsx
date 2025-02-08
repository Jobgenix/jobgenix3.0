import { Card, CardContent } from "@/app/components/ui/card"
import Image from "next/image"

export function OpportunitySection() {
  const opportunities = [
    {
      title: "Quizzes",
      bgColor: "bg-yellow-100",
      img:"https://s3-alpha-sig.figma.com/img/b347/f3d4/1e9feff96615593878aea5778c7d3896?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KbndLwzDLdORT-l7gEsaklBxGc1rRuPRx4265xl~s4Df1V~LuwXLWFJlpAWr5ojZ3q~ZOI5baB73h-6CPd1~iTpoyOLrSu2sULidygvqoOEyMiiIVb47~SUiys3GaarPkqtN5q2bHyEcKzsRYzWLfsLAP9WlGdMmhkewXbprmURYWT8K0fNJbQIIC5MVTjSZAYD33LZsLcDmqvrrlL2m7MATsnPkziGbbPk3pzMmnCk6bjCE75TsLHGEzxofi4Yg8mtpp8CAOHSyJn5rCtkR1s11bTPmbavp7ZCWIiuMBatG75zVyYTa7KykfU9P2TGp5ydnzN3w8Poej8KyZ3rPnA__"
    },
    {
      title: "Aptitude Prep",
      bgColor: "bg-green-100",
      img:"https://s3-alpha-sig.figma.com/img/3a30/66d8/f07649d7911bd1a291d59342e6e860df?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mXO6V4BNkl58vGLHosVUqhJI9vYZo24jLzcdTI5U9BFbUEDUGCMwgBBjzRL-29seuzA8ZAhU-7EihDZD3va-y9x~4oLIVilYbKtfCav35COdigcWjwTJZQY0MAfYwDS7umk0t-MFKOWu1DBhzSpAL-sbsVujRzikdCYQbxB9LhWrUp84VUHi2rbs6ORoCeDhvWoJbBCvNv0Dp8R01ra4z1GAo9HI8TiNv1oxHHMJqnFjQq8vvv64fs1KGm9KjbJ6~QEy143nt1Ge8hHeGGi9piL7jzCjR2yNNN0ax8dopqGeTWUYDlNn5U5H4GUQz~K-K827d1h0qecs3L~xKo3tsQ__"
    },
    {
      title: "Webinar",
      bgColor: "bg-blue-100",
      img:"https://s3-alpha-sig.figma.com/img/b0cc/fc4a/08403a2aba01310a55c507267decd733?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AoKXKzCv0UJ1nNb0gHISdMEiwFJLtFgvk4mF-78lX3rfCWjZL2bdXs~M17dk1wPfRNYa5xd~~yrEt8w8PqYlF8rkbsu0Cdg0i-uJIC~d3ZHgLpc-XnhxqRUjiKMkkFfqMdg0FeaODG2nDVUoaNBUu~G8HLFjyxKDanEd1B24JGMUQD9wDzDYv6nwQISi7Fqchi6mdeESyFNeDJEkAj9D2EaJp9cBokR2uFBLcg0NHeX05GgLmbhkWnRO9wpT4K8O-UGwcubSILDmAKmxgRgjTWlyEZsKMd7ZuMe-r1E~g0bjYnkzVtVrOWoI9enDsFxGKVHL48IrE7Wxbs28r88hcw__"
    },
    {
      title: "Competitions",
      bgColor: "bg-orange-100",
      img:"https://s3-alpha-sig.figma.com/img/d5c5/fdce/58037102ccddefca1493793356e5dcb1?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GewPerbsQ8x1~9lpV1qm1BoQSgPlyq~VL2wqNx7lnGOFMFKavrEXpnT9udMABnsL14AkzZr~QJRdgWV1OolRxhZmsfrCBNENxQul9Wco3n25YsTE0iK084U07bStZCkTvB-hMygH3ie1hBqhYlETkBe7wqCYshyJTEEEnVkjxSpYFNYruyJrLVZiPdivMYUkmFmU7lhMeFGsfRM-fqiyJhbk9LiZqnhouPL758r7JwPl9rlcB~HwunOVixBi5NKWGs1ogSCFlhB98y~aaqO-emNhvf-kJ5rOTcvemyTPuw-F9MyjTKZ6imgdrxmCqeQkG9Qodjs4lKGIm6~~DQj1ng__"
    },
  ]

  return (
    <section className="bg-[linear-gradient(180deg, #C6F7D5 1.5%, #FFF4C5 96%)] px-4 py-16 text-white md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-4xl text-black font-bold">
              Pick <span className="text-[#4CAF50]">The Right Opportunity!</span>
            </h2>
            <p className="text-gray-400">
              Explore opportunities that best suits your skills and interests!
            </p>
            <h2 className="text-2xl mb-2 text-black">Coming Soon</h2>
          </div>
          <a href="#" className="text-blue-400 hover:underline">
            Explore all →
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
          {opportunities.map((opportunity, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${opportunity.bgColor} rounded-2xl `}
            >
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {opportunity.title}
                </h3>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={opportunity.img}
                    alt={opportunity.title}
                    width={300}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

