import Content from "@/components/Content"
import Hero from "@/components/Hero"
import Search from "@/components/Search"
import SearchPump from "@/components/SearchPump"

const Home = () => {
  return (
    <main>
      {/* <div className="bg-white">
        <Hero />
      </div> */}
      <div className="mt-40 flex-col  flex items-center h-fit py-6 bg-[#57B6C6] dark:bg-background">
        <SearchPump />
      </div>
      <div className="py-10 h-fit dark:bg-background dark:border-t dark:border-border">
        <Content />
      </div>
    </main>
  )
}

export default Home
