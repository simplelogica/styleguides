module StyleguideHelpers
  def guides
    pages = sitemap.resources.select do |res|
      res.path.include? 'guides'
    end
    pages.map! do |page|
      {
        title: page.data.nav_title || page.data.title,
        path: page.url
      }
    end
    pages.sort_by { |page| page[:title] }
  end

  def current_page?(page)
    "/#{request.path}" == page
  end

end
