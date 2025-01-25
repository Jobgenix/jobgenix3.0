export  function StatsSection() {
    return (
      <section className="bg-white from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-emerald-600"><span className="text-black">1</span>K+</p>
              <p className="text-sm md:text-base text-gray-600">Active Users</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-emerald-600"><span className="text-black">500</span>+</p>
              <p className="text-sm md:text-base text-gray-600">Opportunities</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-emerald-600"><span className="text-black">150</span>+</p>
              <p className="text-sm md:text-base text-gray-600">Brands trust us</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-emerald-600"><span className="text-black">1</span></p>
              <p className="text-sm md:text-base text-gray-600">Country(INDIA)</p>
            </div>
          </div>
        </div>
      </section>
    )
  }